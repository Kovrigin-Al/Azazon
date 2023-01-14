import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import MainSideBar from "../components/MainSideBar";
import ItemList from "../components/ItemList";
import { useHttp } from "../hooks/httpHooks";
import MobileFilters from "../components/MobileFilters";
import Pages from "../components/Pages";
import FunnelIcon from "../assets/FunnelIcon";

const ShopPage = observer(() => {
  const { item, type, brand } = useContext(Context);

  const { request } = useHttp();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const queryBrand = brand.selected ? `brandId=${brand.selected}&` : ''
  const queryType = type.selected ? `typeId=${type.selected}&` : ''
  const query = queryBrand+queryType+`page=${item.currentPage}&limit=${item.limit}`
  useEffect(() => {
    request("/api/type").then((response) => type.setTypes(response.types));
    request("/api/brand").then((response) => brand.setBrands(response.brands));
    request(`/api/item/?${query}`).then((response) => {
      item.setItems(response.items.rows)
      item.setTotalPages(response.items.count)
    });
  }, []);

  useEffect(() => {
    request("/api/type").then((response) => type.setTypes(response.types));
    request("/api/brand").then((response) => brand.setBrands(response.brands));
    request(`/api/item/?${query}`).then((response) => {
      item.setItems(response.items.rows)
      item.setTotalPages(response.items.count)
    });
  }, [brand.selected, item.currentPage, type.selected]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter*/}
        <MobileFilters
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 py-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Azazone store
            </h1>

            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5"/>
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="hidden lg:block">
                <MainSideBar sort="type" />
                <MainSideBar sort="brand" />
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {item.items.length > 0 && <ItemList />}
        <Pages/>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
});

export default ShopPage;
