const ProductFilter = ({ search, setSearch, category, setCategory, price, setPrice }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-8 grid md:grid-cols-3 gap-4">

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-3 rounded"
      />

      {/* Category */}
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border p-3 rounded"
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
      </select>

      {/* Price */}
      <select
        value={price}
        onChange={e => setPrice(e.target.value)}
        className="border p-3 rounded"
      >
        <option value="">Any Price</option>
        <option value="1000">Under ₹1000</option>
        <option value="2000">Under ₹2000</option>
        <option value="3000">Under ₹3000</option>
      </select>

    </div>
  );
};

export default ProductFilter;
