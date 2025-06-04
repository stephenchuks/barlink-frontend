export default function PromotionsCarousel() {
  // Placeholder data for now
  const promotions = [
    {
      id: 1,
      title: 'Free Drink with Every First Order!',
      desc: 'Order from any Barlink partner and get a free drink—today only.',
    },
    {
      id: 2,
      title: 'Lunch Combos from ₦2000',
      desc: 'Special lunch deals from your favorite local restaurants.',
    },
  ];
  return (
    <section className="mt-8 mb-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Promotions</h2>
      <div className="flex flex-col gap-4">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="rounded-2xl bg-primary/10 border border-primary/20 px-5 py-4 shadow-card text-left"
          >
            <div className="text-primary font-bold">{promo.title}</div>
            <div className="text-gray-700 text-sm">{promo.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
