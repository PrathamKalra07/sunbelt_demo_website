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
  heading: "Explore Properties",
  results: "1,248 Results",

  sortOptions: ["Newest First", "Price Low to High", "Price High to Low"],

  properties: [
    {
      id: 1,
      tag: "FOR SALE",
      image: "contact-property.svg",
      price: "$1,250,000",
      title: "Modern Family Home",
      address: "123 Palm Drive, Miami, FL 33101",
      beds: "4 Beds",
      baths: "3 Baths",
      area: "2,450 Sq Ft",
    },
    {
      id: 2,
      tag: "FOR RENT",
      image: "/luxery-Apartment.svg",
      price: "$3,200/month",
      title: "Luxury Apartment",
      address: "456 Ocean View, Miami, FL 33101",
      beds: "2 Beds",
      baths: "2 Baths",
      area: "1,100 Sq Ft",
    },
    {
      id: 3,
      tag: "FOR SALE",
      image: "/communcial-building.svg",
      price: "$2,750,000",
      title: "Commercial Building",
      address: "789 Business Blvd, Miami, FL 33101",
      beds: "6 Beds",
      baths: "4 Baths",
      area: "5,500 Sq Ft",
    },
    {
      id: 4,
      tag: "FOR RENT",
      image: "/cozy-cottage.svg",
      price: "$2,800/month",
      title: "Cozy Cottage",
      address: "321 Garden St, Miami, FL 33101",
      beds: "3 Beds",
      baths: "2 Baths",
      area: "1,600 Sq Ft",
    },
  ],

  filters: {
    propertyTypes: ["Residential", "Commercial", "Land", "Apartment"],
    bedrooms: ["Any", "1+", "2+", "3+", "4+"],
    bathrooms: ["Any", "2+", "3+", "4+"],
    propertyStatus: ["For Sale", "For Rent"],
  },
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