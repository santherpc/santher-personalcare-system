import * as React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export function Confirmer({
  open,
  onOpenChange,
  onConfirm,
  title = "Tem certeza?",
  description = "Esta ação não pode ser desfeita.",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
}: ConfirmerProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        // Impedir que o diálogo feche enquanto estiver carregando
        if (!loading) onOpenChange(next);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{cancelText}</AlertDialogCancel>
          <Button onClick={onConfirm} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              confirmText
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function useConfirmer() {
  const [open, setOpen] = React.useState(false);
  const [config, setConfig] = React.useState<{
    title?: string;
    description?: string;
    onConfirm: () => Promise<void> | void;
  }>({
    onConfirm: () => {},
  });
  const [loading, setLoading] = React.useState(false);

  const confirm = (
    onConfirm: () => Promise<void> | void,
    options?: { title?: string; description?: string }
  ) => {
    setConfig({
      onConfirm,
      title: options?.title,
      description: options?.description,
    });
    setOpen(true);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await Promise.resolve(config.onConfirm());
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    confirm,
    ConfirmerDialog: (
      <Confirmer
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleConfirm}
        title={config.title}
        description={config.description}
        loading={loading}
      />
    ),
  };
}
