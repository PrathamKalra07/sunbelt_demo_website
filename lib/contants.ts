export const BANNERS = [
  {
    id: "SUNBELT PROPERTIES",
    title: "Find Your Perfect Property with Sunbelt Properties",
    content:
      "Discover premium residential and commercial properties tailored to your lifestyle and investment goals.",
    buttonContent: "Explore Properties",
    image: "/property-banner.svg"
  }
];

export const FOOTER_DATA = {
  about: {
    title: "SUNBELT",
    description:
      "Find your perfect property with Sunbelt Properties. We provide premium real estate solutions tailored to your needs.",
    social: ["facebook", "twitter", "linkedin", "instagram"]
  },

  quickLinks: [
    { name: "Home", link: "/" },
    { name: "Find Property", link: "/find-property" },
    { name: "Contact Us", link: "/contact-us" }
  ],

  propertyTypes: [
    "Residential",
    "Commercial",
    "Luxury Homes",
    "Apartments"
  ],

  contact: {
    phone: "+1 (407) 456-7890",
    email: "info@sunbeltproperties.com",
    address: "123 Sunbelt Blvd, Miami, Florida, USA"
  }
};

export const CONTACT_DATA = {
  bannerImage: "/contact-property.svg",

  heading: "Get in Touch with Sunbelt Properties",

  contactInfo: {
    address: "123 Sunbelt Blvd, Miami, Florida, USA",
    timing: "Mon - Fri: 9am - 7pm | Sat: 10am - 5pm",
    phone: "+1 (407) 456-7890",
    email: "info@sunbeltproperties.com",
  },
};
export const FindProperty_BANNERS = [
  {
    id: "SUNBELT_PROPERTIES",

    heading: "Find Your Perfect Property",

    subheading:
      "Search from thousands of verified residential & commercial listings tailored to your needs.",

    buttonText: "Search Properties",

    image:
      "/find-property.svg",

    searchFields: {
      location: "Location (City / Area)",
      type: "Property Type",
      budget: "Budget (Min – Max Price)",
      bedrooms: "Bedrooms",
    },
  },
];

export const EXPLORE_PROPERTIES = {
  heading: "Available Properties",
  results: "Showing 8 of 12,000+ listings",
  sortOptions: ["Newest First", "Price: Low to High", "Price: High to Low", "Most Popular"],
  filters: {
    propertyTypes: ["Residential", "Commercial", "Land"],
    bedrooms: ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"],
    bathrooms: ["1", "2", "3", "4+"],
    propertyStatus: ["Ready to Move", "Under Construction", "New Launch"],
  },
  properties: [
    { id: 1, title: "Skyline Residency", address: "Bandra West, Mumbai", price: "₹95,00,000", tag: "Featured",   beds: "3 BHK", baths: "3", area: "1,450 sqft", type: "Residential", status: "Ready to Move",       image: "/building.jpg" },
    { id: 2, title: "Green Valley Villa",  address: "Koregaon Park, Pune",  price: "₹72,00,000", tag: "New",        beds: "4 BHK", baths: "4", area: "2,200 sqft", type: "Residential", status: "New Launch",           image: "/building.jpg" },
    { id: 3, title: "Metro Business Hub",  address: "Connaught Place, Delhi", price: "₹1,50,00,000", tag: "Premium", beds: "—",     baths: "2", area: "3,100 sqft", type: "Commercial",  status: "Ready to Move",       image: "/building.jpg" },
    { id: 4, title: "Sunrise Apartments",  address: "Vesu, Surat",           price: "₹45,00,000", tag: "Hot Deal", beds: "2 BHK", baths: "2", area: "980 sqft",  type: "Residential", status: "Under Construction",   image: "/building.jpg" },
    { id: 5, title: "Tech Park Office",    address: "Whitefield, Bengaluru", price: "₹2,20,00,000", tag: "Premium", beds: "—",     baths: "4", area: "5,000 sqft", type: "Commercial",  status: "Ready to Move",       image: "/building.jpg" },
    { id: 6, title: "Lake View Plots",     address: "Gachibowli, Hyderabad", price: "₹30,00,000", tag: "New",      beds: "—",     baths: "—", area: "2,400 sqft", type: "Land",        status: "New Launch",           image: "/building.jpg" },
    { id: 7, title: "Palm Grove Homes",    address: "OMR, Chennai",          price: "₹61,00,000", tag: "Featured", beds: "3 BHK", baths: "3", area: "1,600 sqft", type: "Residential", status: "Ready to Move",       image: "/building.jpg" },
    { id: 8, title: "City Centre Studio",  address: "Lower Parel, Mumbai",   price: "₹28,00,000", tag: "Hot Deal", beds: "1 BHK", baths: "1", area: "520 sqft",  type: "Residential", status: "Under Construction",   image: "/building.jpg" },
  ],
};

export const INSIGHT_MARKET_DATA = {
  heading: "Property Market Insights",
  subheading: "Real-time overview of the property market performance.",

  stats: [
    {
      title: "Active Listings",
      value: "1,248",
      growth: "+12.5%",
      color: "text-purple-600",
    },
    {
      title: "Properties Sold",
      value: "320",
      growth: "+8.3%",
      color: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: "$2.85M",
      growth: "+15.7%",
      color: "text-blue-600",
    },
    {
      title: "Properties Rented",
      value: "210",
      growth: "+6.2%",
      color: "text-yellow-600",
    },
  ],

  salesData: [
    { month: "Jan", sales: 1200000 },
    { month: "Feb", sales: 1600000 },
    { month: "Mar", sales: 1800000 },
    { month: "Apr", sales: 2100000 },
    { month: "May", sales: 2500000 },
    { month: "Jun", sales: 2000000 },
  ],

  revenueData: [
    { month: "Jan", revenue: 1200000 },
    { month: "Feb", revenue: 1600000 },
    { month: "Mar", revenue: 1800000 },
    { month: "Apr", revenue: 2100000 },
    { month: "May", revenue: 2400000 },
    { month: "Jun", revenue: 2800000 },
  ],

  propertyTypes: [
    { name: "Residential", value: 45 },
    { name: "Commercial", value: 25 },
    { name: "Apartment", value: 20 },
    { name: "Land", value: 10 },
  ],

  insights: [
    {
      title: "Verified Listings",
      text: "All properties are verified for your peace of mind.",
    },
    {
      title: "Trusted Agents",
      text: "Work with experienced & trusted real estate experts.",
    },
    {
      title: "Best Prices",
      text: "Find the best deals at competitive prices.",
    },
    {
      title: "24/7 Support",
      text: "We’re here to help you anytime, anywhere.",
    },
  ],
};