import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useDeletePackageMutation } from "@/features/api/packageApi";
import { toast } from "sonner";

const DeletePackageDialog = ({ isOpen, onClose, packageData, onSuccess }) => {
  const [deletePackage, { isLoading }] = useDeletePackageMutation();

  const handleDelete = async () => {
    try {
      await deletePackage(packageData.id).unwrap();
      toast.success('Package deleted successfully!');
      
      // Call success callback
      if (onSuccess) onSuccess();
      
      onClose();
    } catch (error) {
      console.error('Failed to delete package:', error);
      toast.error(error.data?.message || 'Failed to delete package');
    }
  };

  if (!packageData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-red-700 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Delete Package
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this package? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <img
              src={packageData.imageUrl || "/placeholder.svg"}
              alt={packageData.destination}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{packageData.destination}</h3>
              <p className="text-sm text-gray-600">{packageData.location}</p>
              <p className="text-sm font-medium text-green-600">
                PKR {packageData.price?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isLoading ? "Deleting..." : "Delete Package"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePackageDialog;