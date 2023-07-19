import Image from "next/image";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tooltip } from "primereact/tooltip";
import { useRef, useState } from "react";

const SubirFoto = ({ setForm, form, field, title }) => {
  const [totalSize, setTotalSize] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const fileUploadRef = useRef(null);

  const imgUploader = async (e) => {
    const file = e.files[0];

    const reader = new FileReader();
    const blob = await fetch(file.objectURL).then((r) => r.blob()); // blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = () => {
      const base64data = reader.result;
      setForm({ ...form, [field]: base64data });
    };

    setImgUrl(file.objectURL);
  };

  const onTemplateSelect = (e) => {
    let _totalSize = 0;
    const file = e.files[0];

    _totalSize = file.size || 0;

    setTotalSize(_totalSize);
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const itemTemplate = (file, props) => {
    return (
      <>
        <div className="block">
          <div className="flex justify-center w-full">
            <Image
              alt={file.name}
              role="presentation"
              src={file.objectURL}
              width={200}
              height={200}
            />
          </div>

          <div className="flex justify-center mt-2">
            <Button
              type="button"
              icon="pi pi-times"
              className="p-button-outlined p-button-rounded p-button-danger w-1"
              onClick={() => onTemplateRemove(file, props.onRemove)}
            />
          </div>
        </div>
      </>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Arrastra una imagen
        </span>
      </div>
    );
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}

        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined lg:w-1",
  };

  return (
    <>
      <Tooltip target=".custom-choose-btn" content="Elegir" position="bottom" />

      <label className="font-bold text-3xl">{title}</label>
      <FileUpload
        customUpload
        ref={fileUploadRef}
        auto
        uploadHandler={imgUploader}
        multiple={false}
        maxFileSize={1000000}
        chooseOptions={chooseOptions}
        onClear={onTemplateClear}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
      />
    </>
  );
};

export default SubirFoto;
