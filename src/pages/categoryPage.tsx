import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../services/categoryServices/category";

const CategoryPage = () => {
  const { data } = useQuery({
    queryKey: ["categpries"],
    queryFn: getCategory,
  });
  return (
    <>
      <main>
        <section>
          <div>
            {
              data?.map((e: any) => {
                return(
                  <div key={e.id}>
                    <h1>{e.categoryName}</h1>
                    <img src={`https://store-api.softclub.tj/images/${e.categoryImage}`} alt="" />
                  </div>
                )
              })
            }
          </div>
        </section>
      </main>
    </>
  );
};

export default CategoryPage;
