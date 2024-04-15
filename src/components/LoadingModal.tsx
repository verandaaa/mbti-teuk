export default function LoadingModal() {
  return (
    <>
      <div className="top-0 left-0 fixed bg-black opacity-50 w-screen h-screen"></div>
      <div className="top-1/2 left-1/2 fixed transform -translate-x-1/2 -translate-y-1/2">
        <div className="border-8 border-white border-t-yellow-300 rounded-full w-20 h-20 animate-spin"></div>
      </div>
    </>
  );
}
