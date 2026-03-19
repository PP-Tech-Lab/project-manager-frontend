export interface AlertDialogProps {
  title: string;
  description: string;
  confirmText: string;
  show: boolean;
  onClose: () => void;
  type: 'error' | 'success';
}
