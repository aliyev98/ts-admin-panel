import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import RouteButton from "../../ui/buttons/RouteButton";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/features/productSlice";

const languages = ["az", "tr", "en", "ru"];
const baseLanguage = "az";

export default function AddProduct() {
  const [activeLanguage, setActiveLanguage] = useState(baseLanguage);
  const dispatch = useDispatch();
  const creating = useSelector(s => s.product.creating);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      sku: "",
      brand_id: null,
      // Çok dilli alanlar nested
      title: { az: "", tr: "", en: "", ru: "" },
      // description vb. eklemek istersen aynı kalıp: description: { az:"", ... }
    },
  });

  const onSubmit = (values) => {
    // Sadece az zorunlu (validasyonla da destekliyoruz)
    // Diğer diller boş kalabilir, backend title objesi bekliyor:
    // {
    //   title: { az: "bahalı maşın", tr:"", en:"", ru:"" }
    // }
    // Boş dilleri istersen "" olarak bırak, istersen filtreleme yap.
    // Backend'in beklediğine göre seç:
    const payload = {
      sku: values.sku,
      brand_id: values.brand_id,
      title: values.title, // { az, tr, en, ru }
    };

    dispatch(createProduct(payload));
  };

  return (
    <div className="section-container add-product-section">
      <div className="section-header">
        <div className="section-name">
          <Plus />
          <span>Məhsul əlavə et</span>
        </div>
        <RouteButton content="Bütün məhsullar" route="products" />
      </div>

      <div className="section-content">
        {/* Dil sekmeleri */}
        <div className="lang-tabs">
          {languages.map((lang) => {
            const v = getValues(); // sekme doluluk göstergesi istersen
            const filled = v?.title?.[lang]?.trim();
            return (
              <button
                type="button"
                key={lang}
                className={`lang-btn ${activeLanguage === lang ? "active" : ""}`}
                onClick={() => setActiveLanguage(lang)}
                title={filled ? "Bu dilde başlık girildi" : ""}
              >
                {lang.toUpperCase()}
                {filled ? " •" : ""}
              </button>
            );
          })}
        </div>

        <form className="add-product-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Çok dilli: sadece aktif sekmenin inputu görünür, diğerleri form state'te tutulur */}
          <div className="input-with-label">
            <label htmlFor={`title.${activeLanguage}`}>
              <span>Title</span>
              <span>({activeLanguage.toUpperCase()})</span>
            </label>

            <input
              id={`title.${activeLanguage}`}
              type="text"
              placeholder="Məhsul adı..."
              // Sadece az zorunlu; diğer diller opsiyonel
              {...register(`title.${activeLanguage}`, {
                required:
                  activeLanguage === baseLanguage
                    ? "AZ dilində məhsul adı zorunludur"
                    : false,
              })}
            />
            {activeLanguage === baseLanguage && errors?.title?.[baseLanguage] && (
              <small className="error-text">
                {errors.title[baseLanguage].message}
              </small>
            )}
          </div>

          {/* İstersen tek dilli alanlar */}
          <div className="input-with-label">
            <label htmlFor="sku">SKU</label>
            <input id="sku" type="text" placeholder="SKU" {...register("sku")} />
          </div>

          {/* Örnek select: RHF ile bağlamak istersen register kullan */}
          {/* <Select placeholder="Brend seçin" /> */}
          <div className="input-with-label">
            <label htmlFor="brand_id">Brand</label>
            <input id="brand_id" type="number" placeholder="Brand ID"
              {...register("brand_id")} />
          </div>

          <button type="submit" className="create" disabled={creating}>
            {creating ? "Yaradılır..." : "Yarat"}
          </button>
        </form>
      </div>
    </div>
  );
}
