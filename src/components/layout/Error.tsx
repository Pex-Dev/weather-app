import iconError from "../../assets/images/icon-error.svg";

export default function Error() {
  return (
    <div>
      <img src={iconError} alt="Icon error" />
      <h1>Something went wrong</h1>
      <p>
        We couldn't connect to the server (API error). Please try again in a few
        moments
      </p>
      <button>Retry</button>
    </div>
  );
}
