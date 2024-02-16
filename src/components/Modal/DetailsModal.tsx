function DetailsModal({ modelData }) {
  return (
    <>
      <input type="checkbox" id="details-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="details-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <img
            className="size-52 justify-self-center"
            src={modelData?.img}
            alt={modelData?.name}
          />
          <h4 className="text-2xl font-bold text-center my-3">
            Product details:
          </h4>
          <section className="grid grid-cols-1 lg:grid-cols-2">
            {/* left side */}
            <div>
              <p className="text-lg  mb-2">
                Name: <span className="font-bold">{modelData?.name}</span>
              </p>
              <p className="text-lg mb-2">
                Price: <span className="font-bold">{modelData?.price}</span>
              </p>
              <p className="text-lg mb-2">
                Quantity:{" "}
                <span className="font-bold">{modelData?.quantity}</span>
              </p>
              <p className="text-lg mb-2">
                Category:{" "}
                <span className="font-bold">{modelData?.category}</span>
              </p>
            </div>
            {/* right side  */}
            <div>
              <p className="text-lg mb-2">
                Operating System:
                <span className="font-bold"> {modelData?.operatingSystem}</span>
              </p>
              <p className="text-lg mb-2">
                connectivity :{" "}
                <span className="font-bold"> {modelData?.connectivity}</span>
              </p>
              <p className="text-lg mb-2">
                Power Source:{" "}
                <span className="font-bold">{modelData?.powerSource}</span>
              </p>
              <p className="text-lg mb-2">
                Features :{" "}
                <span className="font-bold">{modelData?.features}</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default DetailsModal;
