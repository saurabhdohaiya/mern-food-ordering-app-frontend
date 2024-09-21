import { Button } from './ui/button';
import { useOrderInvoiceDownload } from '@/api/InvoiceDownloadAPI';

type Props = {
    orderId: string;
}


const OrderInvoice = ({ orderId } : Props) => {
    const {isLoading: isOrderInvoiceLoading, downloadOrderInvoice} = useOrderInvoiceDownload(orderId);

    return (
        <Button className="flex-1 font-bold bg-orange-500" onClick={()=>downloadOrderInvoice()} disabled={isOrderInvoiceLoading}>
            {isOrderInvoiceLoading ? 'Generating Invoice...' : 'Download Invoice'}
        </Button>
    );
};

export default OrderInvoice;
