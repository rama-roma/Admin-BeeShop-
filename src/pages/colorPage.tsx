import { useQuery } from "@tanstack/react-query";
import { getColor } from "../services/colorServices/color";

const ColorPage = () => {
  const { data } = useQuery({
    queryKey: ["color"],
    queryFn: getColor,
  });
  
  return (
    <>
      <main>
        <section>
          <div>
            {
              data?.map((e) => {
                return(
                  <div key={e.id}>
                    <h1>{e.colorName}</h1>
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

export default ColorPage;
