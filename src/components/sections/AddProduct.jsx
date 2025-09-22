import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Grip, ScrollText } from 'lucide-react'
import SectionSearchBar from '../../ui/inputs/SectionSearchBar'
import LayoutDropdown from '../dropdowns/LayoutDropdown'
import AddButton from '../../ui/buttons/AddButton'
import PrimaryButton from '../../ui/buttons/PrimaryButton'
import InputWithLabel from '../../ui/inputs/InputWithLabel'
import TextareaWithLabel from "../../ui/inputs/TextareaWithLabel";


const AddProduct = () => {

  const languages = ["az", "tr", "en", "ru"];
  const baseLanguage = "az";

  const [activeLanguage, setActiveLanguage] = useState(baseLanguage);

  const { register, handleSubmit, getValues, setValue, formState: { errors, isSubmitting } } =

    useForm({
      defaultValues: {
        // Translatable alanlar (locale-keyed object)
        title: { az: "", tr: "", en: "", ru: "" },
        description: { az: "", tr: "", en: "", ru: "" },
        slug: { az: "", tr: "", en: "", ru: "" },
        imageAlt: { az: "", tr: "", en: "", ru: "" },

        // Non-translatable alanlar
        sku: "",
        price: "",
        stock_count: "",
        category_id: "",
        is_active: true,
      },
    });

  const copyFromBase = (field) => {
    if (activeLanguage === baseLanguage) return;
    const baseVal = getValues(`${field}.${baseLanguage}`);
    setValue(`${field}.${activeLanguage}`, baseVal ?? "");
  };

  const slugify = (s) =>
    (s || "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[\s]+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  const makeSlugFromTitle = () => {
    const t = getValues(`title.${activeLanguage}`);
    setValue(`slug.${activeLanguage}`, slugify(t));
  };

  const submit = (values) => {
    const payload = {
      title: values.title,
      description: values.description,
      slug: values.slug,
      image_alt: values.imageAlt,
      sku: values.sku,
      price: Number(values.price),
      stock_count: Number(values.stock_count),
      category_id: values.category_id ? Number(values.category_id) : null,
      is_active: !!values.is_active,
    };
    onSubmit ? onSubmit(payload) : console.log("SUBMIT →", payload);
  };

  return (
    <div className='section-container add-product-section'>

      <div className="section-header">

        <div className='section-name'>

          <ScrollText />
          <span>Məhsul əlavə et</span>

        </div>

        {/* <SectionSearchBar /> */}

        {/* <div className="change-layout" onClick={() => setOpen((prev) => !prev)}>
          <Grip />
        </div> */}

        <PrimaryButton content="Bütün məhsullar" route="products" />


      </div>

      <div className="product-counts">

        <div>
          <span>Bütün məhsullar</span>
          <span>(24356)</span>
        </div>

        <div>
          <span>Yayımlananlar</span>
          <span>(2387)</span>
        </div>

        <div>
          <span>Endirimdə</span>
          <span>(339487)</span>
        </div>

      </div>

      <div className="section-content">

        <div className="lang-tabs">

          {
            languages.map((lang) => (
              <button type="button" key={lang} className={`lang-btn ${activeLanguage === lang ? "active" : ""}`} onClick={() => setActiveLanguage(lang)}>
                {lang.toUpperCase()}
              </button>
            ))
          }



        </div>

        <form className="add-product-form">


          <InputWithLabel label='Məhsulun adı' lang={activeLanguage.toUpperCase()} htmlFor="title" register={register} activeLanguage={activeLanguage} baseLanguage={baseLanguage} />

          <TextareaWithLabel label={"Məsulun açıqlaması"} lang={activeLanguage.toUpperCase()} />


        </form>

      </div>

    </div>
  )
}

export default AddProduct