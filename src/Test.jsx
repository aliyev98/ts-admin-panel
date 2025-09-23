// ProductForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const LOCALES = ["az", "tr", "en", "ru"];
const BASE_LOCALE = "az";

export default function ProductForm({ onSubmit }) {

  const [activeLocale, setActiveLocale] = useState(BASE_LOCALE);

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

  // Aktif dildeki alanı baz dilden kopyala (tek tek)
  const copyFromBase = (field) => {
    if (activeLocale === BASE_LOCALE) return;
    const baseVal = getValues(`${field}.${BASE_LOCALE}`);
    setValue(`${field}.${activeLocale}`, baseVal ?? "");
  };

  // Başlıktan slug üret (aktif dil için)
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
    const t = getValues(`title.${activeLocale}`);
    setValue(`slug.${activeLocale}`, slugify(t));
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
    <form className="product-form" onSubmit={handleSubmit(submit)}>
      {/* Dil sekmeleri (translatable alanlar bu sekmeye göre değişir) */}
      <div className="locale-tabs">
        {LOCALES.map((loc) => (
          <button
            key={loc}
            type="button"
            className={`tab ${activeLocale === loc ? "active" : ""}`}
            onClick={() => setActiveLocale(loc)}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Translatable group */}
      <div className="card">

        <div className="row">

          <label>Başlık ({activeLocale.toUpperCase()})</label>

          <div className="field-with-actions">
            <input
              {...register(`title.${activeLocale}`, { required: activeLocale === BASE_LOCALE })}
              placeholder={`Örn. Ürün adı (${activeLocale})`}
            />

            <div className="actions">
              <button type="button" onClick={makeSlugFromTitle}>Slug üret</button>
              {activeLocale !== BASE_LOCALE && (
                <button type="button" onClick={() => copyFromBase("title")}>
                  {BASE_LOCALE.toUpperCase()}’dan kopyala
                </button>
              )}
            </div>
          </div>
          
          {errors.title?.[activeLocale] && (
            <small className="error">Ana dilde başlık zorunlu.</small>
          )}

        </div>

        <div className="row">
          <label>Açıklama ({activeLocale.toUpperCase()})</label>
          <textarea
            rows={4}
            {...register(`description.${activeLocale}`)}
            placeholder={`Ürün açıklaması (${activeLocale})`}
          />
        </div>

        <div className="row">
          <label>Slug ({activeLocale.toUpperCase()})</label>
          <div className="field-with-actions">
            <input
              {...register(`slug.${activeLocale}`)}
              placeholder={`urun-adi-${activeLocale}`}
            />
            {activeLocale !== BASE_LOCALE && (
              <button type="button" onClick={() => copyFromBase("slug")}>
                {BASE_LOCALE.toUpperCase()}’dan kopyala
              </button>
            )}
          </div>
        </div>

        <div className="row">
          <label>Görsel Alt Metin ({activeLocale.toUpperCase()})</label>
          <div className="field-with-actions">
            <input
              {...register(`imageAlt.${activeLocale}`)}
              placeholder={`Görsel alt metni (${activeLocale})`}
            />
            {activeLocale !== BASE_LOCALE && (
              <button type="button" onClick={() => copyFromBase("imageAlt")}>
                {BASE_LOCALE.toUpperCase()}’dan kopyala
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Non-translatable group */}
      <div className="card">
        
        <div className="row">
          <label>SKU</label>
          <input {...register("sku", { required: true })} placeholder="UX-123" />
          {errors.sku && <small className="error">SKU zorunlu.</small>}
        </div>

        <div className="row grid2">
          <div>
            <label>Fiyat (AZN)</label>
            <input type="number" step="0.01" {...register("price", { required: true })} />
            {errors.price && <small className="error">Fiyat zorunlu.</small>}
          </div>
          <div>
            <label>Stok</label>
            <input type="number" {...register("stock_count", { required: true })} />
            {errors.stock_count && <small className="error">Stok zorunlu.</small>}
          </div>
        </div>

        <div className="row grid2">
          <div>
            <label>Kategori ID</label>
            <input type="number" {...register("category_id")} placeholder="örn. 5" />
          </div>
          <div className="check">
            <label>
              <input type="checkbox" {...register("is_active")} defaultChecked />
              Yayında
            </label>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>Kaydet</button>
      </div>
    </form>
  );
}
