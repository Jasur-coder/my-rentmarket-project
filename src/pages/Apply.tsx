import { baseUrl, getData } from "@/api/https";
import ProductPage from "@/components/ProductPage"
import { QueryEndpoints } from "@/utils/endpoints";
import { useParams } from "react-router-dom";

const Apply = () => {

    const params = useParams();
    const { id } = params;

    const { data, isLoading, error, isError } = useQuery<ProductCardProps>({
        queryKey: [QueryKeys.products, id],
        queryFn: () => getData(`${baseUrl}${QueryEndpoints.products}/${id}`),
      });
    

    return (
        <div className="container">
            <ProductPage />
        </div>
    )
}

export default Apply   