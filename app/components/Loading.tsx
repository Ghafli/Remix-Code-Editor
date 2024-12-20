export function Loading() {
  return <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="lds-ring">
          <div></div><div></div><div></div><div></div>
        </div>
      </div>
}