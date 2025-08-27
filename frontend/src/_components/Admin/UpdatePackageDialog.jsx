import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useUpdatePackageMutation } from "@/features/api/packageApi";

const UpdatePackageDialog = ({ isOpen, onClose, packageData, onSuccess }) => {
  const [updatePackage, { isLoading }] = useUpdatePackageMutation();
  const [formData, setFormData] = useState({
    destination: "",
    description: "",
    location: "",
    hotelName: "",
    hotelType: "",
    difficulty: "",
    price: "",
    duration: "",
    peopleCount: "",
    roomsCount: "",
    complementaryBreakfast: false,
    pickAndDrop: false,
    features: [],
  });
  const [newFeature, setNewFeature] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Initialize form with package data when dialog opens or packageData changes
  useEffect(() => {
    if (packageData) {
      setFormData({
        destination: packageData.destination || "",
        description: packageData.description || "",
        location: packageData.location || "",
        hotelName: packageData.hotelName || "",
        hotelType: packageData.hotelType || "",
        difficulty: packageData.difficulty || "",
        price: packageData.price?.toString() || "",
        duration: packageData.duration?.toString() || "",
        peopleCount: packageData.peopleCount?.toString() || "",
        roomsCount: packageData.roomsCount?.toString() || "",
        complementaryBreakfast: packageData.complementaryBreakfast || false,
        pickAndDrop: packageData.pickAndDrop || false,
        features: packageData.features || [],
      });
    }
  }, [packageData, isOpen]); // Added isOpen to reset when dialog opens

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleChange = (field, checked) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (featureToRemove) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((feature) => feature !== featureToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData for the request
      const submitData = new FormData();

      // Append all form data
      submitData.append("destination", formData.destination);
      submitData.append("description", formData.description);
      submitData.append("location", formData.location);
      submitData.append("hotelName", formData.hotelName);
      submitData.append("hotelType", formData.hotelType);
      submitData.append("difficulty", formData.difficulty);
      submitData.append("price", formData.price);
      submitData.append("duration", formData.duration);
      submitData.append("peopleCount", formData.peopleCount);
      submitData.append("roomsCount", formData.roomsCount);
      submitData.append(
        "complementaryBreakfast",
        formData.complementaryBreakfast.toString()
      );
      submitData.append("pickAndDrop", formData.pickAndDrop.toString());
      submitData.append("features", JSON.stringify(formData.features));

      // Append the image file if selected
      if (selectedFile) {
        submitData.append("image", selectedFile);
      }

      // Log the form data for debugging
      console.log("Form data being sent:", {
        destination: formData.destination,
        description: formData.description,
        location: formData.location,
        hotelName: formData.hotelName,
        hotelType: formData.hotelType,
        difficulty: formData.difficulty,
        price: formData.price,
        duration: formData.duration,
        peopleCount: formData.peopleCount,
        roomsCount: formData.roomsCount,
        complementaryBreakfast: formData.complementaryBreakfast,
        pickAndDrop: formData.pickAndDrop,
        features: formData.features,
      });

      // Call the mutation
      await updatePackage({
        id: packageData.id,
        body: submitData,
      }).unwrap();

      // Show success toast
      toast.success("Package updated successfully!");

      // Reset form and close dialog
      setSelectedFile(null);
      setNewFeature("");

      // Call success callback
      if (onSuccess) onSuccess();

      onClose();
    } catch (error) {
      console.error("Failed to update package:", error);
      toast.error(error.data?.message || "Failed to update package");
    }
  };

  if (!packageData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-blue-700">
            Update Package
          </DialogTitle>
          <DialogDescription>
            Update the details of your travel package
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="destination" className="text-sm font-medium">
                Destination Name
              </Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) =>
                  handleInputChange("destination", e.target.value)
                }
                placeholder="e.g., Hunza Valley"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., Gilgit-Baltistan"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the package details, attractions, and highlights..."
              rows={4}
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price" className="text-sm font-medium">
                Price (PKR)
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="e.g., 45000"
                min="0"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="duration" className="text-sm font-medium">
                Duration (Days)
              </Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g., 5"
                min="1"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="peopleCount" className="text-sm font-medium">
                People Count
              </Label>
              <Input
                id="peopleCount"
                type="number"
                value={formData.peopleCount}
                onChange={(e) =>
                  handleInputChange("peopleCount", e.target.value)
                }
                placeholder="e.g., 4"
                min="1"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="roomsCount" className="text-sm font-medium">
                Rooms Count
              </Label>
              <Input
                id="roomsCount"
                type="number"
                value={formData.roomsCount}
                onChange={(e) =>
                  handleInputChange("roomsCount", e.target.value)
                }
                placeholder="e.g., 2"
                min="1"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="image" className="text-sm font-medium">
                Package Image (Leave empty to keep current)
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hotelName" className="text-sm font-medium">
                Hotel Name
              </Label>
              <Input
                id="hotelName"
                value={formData.hotelName}
                onChange={(e) => handleInputChange("hotelName", e.target.value)}
                placeholder="e.g., Serena Hotel Hunza"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="hotelType" className="text-sm font-medium">
                Hotel Type
              </Label>
              <Select
                value={formData.hotelType}
                onValueChange={(value) => handleInputChange("hotelType", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hotel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STANDARD">Standard</SelectItem>
                  <SelectItem value="DELUXE">Deluxe</SelectItem>
                  <SelectItem value="LUXURY">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="difficulty" className="text-sm font-medium">
              Difficulty Level
            </Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value) => handleInputChange("difficulty", value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EASY">Easy</SelectItem>
                <SelectItem value="MODERATE">Moderate</SelectItem>
                <SelectItem value="EXTREME">Extreme</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="complementaryBreakfast"
                className="text-sm font-medium"
              >
                Complementary Breakfast
              </Label>
              <Switch
                id="complementaryBreakfast"
                checked={formData.complementaryBreakfast}
                onCheckedChange={(checked) =>
                  handleToggleChange("complementaryBreakfast", checked)
                }
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="pickAndDrop" className="text-sm font-medium">
                Pick & Drop Service
              </Label>
              <Switch
                id="pickAndDrop"
                checked={formData.pickAndDrop}
                onCheckedChange={(checked) =>
                  handleToggleChange("pickAndDrop", checked)
                }
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Package Features</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature (e.g., Free WiFi, Breakfast Included)"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addFeature())
                }
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={addFeature}
                variant="outline"
                disabled={isLoading}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-green-100 text-green-800 cursor-pointer"
                  onClick={() => !isLoading && removeFeature(feature)}
                >
                  {feature} ×
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Package"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePackageDialog;
