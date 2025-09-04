import MainLayout from "../Components/Layout/MainLayout";

const Landing = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-5xl font-bold text-blue-900 mb-4">Smart Inventory Management System </h1>
          <h1 className="text-3xl font-bold mb-4">Dashboard </h1>
          <p className="text-lg text-gray-700">This is the Dashboard page content.</p>
          {/* Add more profile related content here */}
        </div>
    </MainLayout>
  );
};

export default Landing;
