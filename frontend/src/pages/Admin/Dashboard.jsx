const Dashboard = () => {
  const stats = [
    {
      title: "Students",
      value: "1,240",
    },
    {
      title: "Faculty",
      value: "85",
    },
    {
      title: "Parents",
      value: "1,120",
    },
    {
      title: "Classes",
      value: "48",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">
        Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <p className="text-slate-400">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold text-white mt-2">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;