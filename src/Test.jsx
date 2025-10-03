import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RouteButton from "./ui/buttons/RouteButton";
import InputWithLabel from "./ui/inputs/InputWithLabel";
import Select from "./ui/selects/Select";
import TextareaWithLabel from "./ui/inputs/TextareaWithLabel";

const AddProduct = () => {
  const languages = ["az", "tr", "en", "ru"];
  const baseLanguage = "az";
  const [activeLanguage, setActiveLanguage] = useState(baseLanguage);

  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      sku: "",
      brandId: null,
      title: { az: "", tr: "", en: "", ru: "" },
      description: { az: "", tr: "", en: "", ru: "" },
      // diğer alanlar…
    },
  });

  const onSubmit = (values) => {
    // Boş dilleri ayıkla ve translations oluştur
    const translations = languages
      .map((lng) => ({
        locale: lng,
        title: values.title?.[lng]?.trim() || "",
        description: values.description?.[lng]?.trim() || "",
      }))
      .filter(t => t.title || t.description); // tamamen boş olan dilleri gönderme

    const payload = {
      sku: values.sku,
      brand_id: values.brandId,
      // … tek dilli alanlar
      translations, // backend bu formatı bekliyorsa
    };

    console.log("PAYLOAD:", payload);
    // axios.post('/product', payload)
  };

  return (
    <div className='section-container add-product-section'>
      <div className="section-header">
        <div className='section-name'>
          <span>Məhsul əlavə et</span>
        </div>
        <RouteButton content="Bütün məhsullar" route="products" />
      </div>

      <div className="section-content">

        {/* Dil sekmeleri */}
        <div className="lang-tabs">
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              className={`lang-btn ${activeLanguage === lang ? "active" : ""}`}
              onClick={() => setActiveLanguage(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <form className="add-product-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Çok dilli alanlar */}
          <InputWithLabel
            label='Məhsulun adı'
            placeholder='Məhsul adı...'
            lang={activeLanguage.toUpperCase()}
            data="title"
            activeLanguage={activeLanguage}
            baseLanguage={baseLanguage}
            register={register}
            requiredMessage="Az dilində məhsul adı zorunludur"
            error={errors?.title?.[activeLanguage]?.message}
          />

          <TextareaWithLabel
            label='Məhsulun açıqlaması'
            placeholder='Məhsul haqqında...'
            lang={activeLanguage.toUpperCase()}
            data="description"
            activeLanguage={activeLanguage}
            baseLanguage={baseLanguage}
            register={register}
            requiredMessage="Az dilində açıqlama zorunludur"
            error={errors?.description?.[activeLanguage]?.message}
          />

          {/* Tek dilli alanlar */}
          <InputWithLabel
            label="SKU"
            placeholder="SKU"
            singleName="sku"
            register={register}
          />

          {/* örnek select: değerini RHF ile bağlamak istersen Select içini uyarlamalısın */}
          <Select placeholder="Brend seçin" />

          <button type="submit" className="btn primary">Yadda saxla</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
