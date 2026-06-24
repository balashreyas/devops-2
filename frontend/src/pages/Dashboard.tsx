import React from 'react';

const recipes = [
  {
    id: 1,
    title: "Hyderabadi Chicken Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Basmati Rice", quantity: "1", unit: "kg" },
      { name: "Chicken", quantity: "1", unit: "kg" },
      { name: "Yogurt", quantity: "250", unit: "g" },
      { name: "Fried Onions", quantity: "200", unit: "g" },
      { name: "Biryani Masala", quantity: "2", unit: "tbsp" }
    ],
    instructions: "1. Marinate chicken with yogurt, spices, and fried onions for 2 hours.\n2. Boil rice until 70% done.\n3. Layer chicken and rice in a heavy-bottomed pot.\n4. Seal the pot and cook on Dum (slow heat) for 40 mins."
  },
  {
    id: 2,
    title: "Mutton Haleem",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Boneless Mutton", quantity: "500", unit: "g" },
      { name: "Broken Wheat", quantity: "200", unit: "g" },
      { name: "Ghee", quantity: "150", unit: "g" },
      { name: "Mixed Lentils", quantity: "100", unit: "g" },
      { name: "Rose Petals", quantity: "1", unit: "tbsp" }
    ],
    instructions: "1. Slow cook mutton until extremely tender.\n2. Boil broken wheat and lentils until mushy.\n3. Blend meat and grains together.\n4. Slow cook with copious amounts of ghee and spices while continuously mashing for 2 hours."
  },
  {
    id: 3,
    title: "Double Ka Meetha",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ingredients: [
      { name: "Bread Slices", quantity: "6", unit: "pieces" },
      { name: "Milk", quantity: "500", unit: "ml" },
      { name: "Sugar", quantity: "150", unit: "g" },
      { name: "Ghee", quantity: "100", unit: "g" },
      { name: "Mixed Nuts", quantity: "50", unit: "g" }
    ],
    instructions: "1. Deep fry bread slices in ghee until golden brown.\n2. Boil milk until it thickens slightly.\n3. Make sugar syrup.\n4. Soak fried bread in sugar syrup, then pour the thickened milk over it. Garnish with nuts."
  }
];

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
      <h2 className="text-neon-cyan" style={{ marginBottom: '40px', fontSize: '2.5rem', textAlign: 'center' }}>Legendary Recipes</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', width: '100%' }}>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="flip-card">
            <div className="flip-card-inner">
              
              {/* FRONT OF CARD */}
              <div className="flip-card-front glass-panel">
                <div style={{ 
                  height: '250px', 
                  backgroundImage: `url(${recipe.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px'
                }}></div>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <h3 className="text-neon-pink" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{recipe.title}</h3>
                  <p style={{ color: 'var(--gta-text-muted)', fontStyle: 'italic' }}>Hover to reveal the secret recipe!</p>
                </div>
              </div>

              {/* BACK OF CARD */}
              <div className="flip-card-back glass-panel" style={{ padding: '25px', overflowY: 'auto' }}>
                <h3 className="text-neon-cyan" style={{ fontSize: '1.4rem', marginBottom: '15px', textAlign: 'center' }}>{recipe.title}</h3>
                
                <h4 style={{ color: 'var(--gta-orange)', marginBottom: '10px' }}>Ingredients</h4>
                <ul style={{ listStyle: 'none', marginBottom: '20px', fontSize: '0.95rem' }}>
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px', marginBottom: '5px' }}>
                      <span>{ing.name}</span>
                      <span style={{ color: 'var(--gta-cyan)' }}>{ing.quantity} {ing.unit}</span>
                    </li>
                  ))}
                </ul>

                <h4 style={{ color: 'var(--gta-orange)', marginBottom: '10px' }}>Instructions</h4>
                <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem', color: 'white', lineHeight: '1.5' }}>
                  {recipe.instructions}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
