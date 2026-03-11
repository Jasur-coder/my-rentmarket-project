import { baseUrl, getData } from "@/api/https";
import ProductPage from "@/components/ProductPage";
import type { ProductCardProps } from "@/components/type";
import { QueryEndpoints } from "@/utils/endpoints";
import { QueryKeys } from "@/utils/keys";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Apply = () => {
    const params = useParams();
    const { id } = params;

    useQuery<ProductCardProps>({
        queryKey: [QueryKeys.products, id],
        queryFn: () => getData(`${baseUrl}${QueryEndpoints.products}/${id}`),
    });

    return (
        <div className="container">
            <ProductPage />
        </div>
    );
};

export default Apply;
