import { Grip, Plus } from 'lucide-react'
import React, { useState } from 'react'
import PrimaryButton from '../../ui/buttons/PrimaryButton'
import InputWithLabel from '../../ui/inputs/InputWithLabel';
import TextareaWithLabel from '../../ui/inputs/TextareaWithLabel';
import Select from '../../ui/selects/Select';
import { useForm } from 'react-hook-form';
import SectionSearchBar from '../../ui/inputs/SectionSearchBar';

const AddBrand = () => {

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
                brand: { az: "", tr: "", en: "", ru: "" },

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
            brand: values.brand,
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
        <div className='add-brand-section section-container'>

            <div className="section-header">

                <div className='section-name'>

                    <Plus />
                    <span>Brend əlavə et</span>

                </div>

                {/* <SectionSearchBar /> */}

                {/* <div className="change-layout" onClick={() => setOpen((prev) => !prev)}>
                    <Grip />
                </div> */}

                <PrimaryButton content="Bütün brendlər" route="brands" />


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

                    <InputWithLabel label='Məhsulun adı' lang={activeLanguage.toUpperCase()} htmlFor="title" register={register} data='title' activeLanguage={activeLanguage} baseLanguage={baseLanguage} />

                    <TextareaWithLabel label={"Məsulun açıqlaması"} placeholder={'Məhsul haqqında...'} lang={activeLanguage.toUpperCase()} register={register} data='description' activeLanguage={activeLanguage} baseLanguage={baseLanguage} />

                    <InputWithLabel label="Sku" register={register} singleName="sku" />

                    <Select placeholder="Brend seçin" />


                </form>

            </div>

        </div>
    )
}

export default AddBrand