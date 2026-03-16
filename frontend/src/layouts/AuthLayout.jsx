export default function AuthLayout({ children }) {
  return (
    <div className="grid grid-cols-1 grid-rows-3 gap-4 h-screen">
      <div className="App h-2/6">1</div>
      <div className="App">2 {children}</div>
      <div className="App h-2/6">3</div>
    </div>
  );
}
