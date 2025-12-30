import { useQuery } from "@tanstack/react-query";
import { getBrand } from "../services/brandServices/brand";

const BrandPage = () => {
  const { data } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrand,
  });

  return (
    <main>
      <section>
        <div>
          {data?.map((e: any) => (
            <div key={e.id}>
              <h1>{e.brandName}</h1>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BrandPage;
