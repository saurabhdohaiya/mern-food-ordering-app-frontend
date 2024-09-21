import { useState } from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {toast} from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useOrderInvoiceDownload = (orderId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const downloadOrderInvoice = async () => {
    const accessToken = await getAccessTokenSilently();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/invoice/${orderId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
      });

      if (!response.ok) {
        throw new Error(`Error fetching the PDF: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${orderId}.pdf`);
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Order Inovice downloaded successfully", {
        duration: 2000
      });
    } catch (error) {
      toast.error(`Error downloading invoice: ${error}`, {
        duration: 2000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { downloadOrderInvoice, isLoading };
};