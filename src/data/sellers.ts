/**
 * DEMO / MOCK DATA — illustrative sellers for the SACCO-SOKO prototype.
 */
import { Seller } from "@/types";

export const sellers: Seller[] = [
  { id: "tech-hub-kenya", businessName: "Tech Hub Kenya", ownerName: "Brian Otieno", email: "sales@techhub.example.com", phone: "+254 711 000 001", location: "Nairobi", saccoId: "forward-trans", rating: 4.8, productsCount: 156, joinedYear: "2022", verified: true },
  { id: "footwear-king", businessName: "Footwear King", ownerName: "Susan Wanjiru", email: "sales@footwearking.example.com", phone: "+254 711 000 002", location: "Nairobi", saccoId: "cbd-shuttle", rating: 4.6, productsCount: 98, joinedYear: "2021", verified: true },
  { id: "audio-world", businessName: "Audio World", ownerName: "Kevin Mwangi", email: "sales@audioworld.example.com", phone: "+254 711 000 003", location: "Nairobi", saccoId: "citee-express", rating: 4.5, productsCount: 210, joinedYear: "2023", verified: true },
  { id: "time-gallery", businessName: "Time Gallery", ownerName: "Ann Njeri", email: "sales@timegallery.example.com", phone: "+254 711 000 004", location: "Nairobi", saccoId: "forward-trans", rating: 4.7, productsCount: 64, joinedYear: "2022", verified: true },
  { id: "bags-and-more", businessName: "Bags & More", ownerName: "Daniel Kiptoo", email: "sales@bagsandmore.example.com", phone: "+254 711 000 005", location: "Thika", saccoId: "cbd-shuttle", rating: 4.4, productsCount: 52, joinedYear: "2021", verified: true },
  { id: "fittech", businessName: "FitTech", ownerName: "Faith Achieng", email: "sales@fittech.example.com", phone: "+254 711 000 006", location: "Nairobi", saccoId: "citee-express", rating: 4.3, productsCount: 87, joinedYear: "2023", verified: true },
  { id: "powerup", businessName: "PowerUp", ownerName: "Moses Kariuki", email: "sales@powerup.example.com", phone: "+254 711 000 007", location: "Nairobi", saccoId: "forward-trans", rating: 4.6, productsCount: 143, joinedYear: "2020", verified: true },
  { id: "fashion-hub", businessName: "Fashion Hub", ownerName: "Lucy Wambui", email: "sales@fashionhub.example.com", phone: "+254 711 000 008", location: "Nairobi", saccoId: "cbd-shuttle", rating: 4.2, productsCount: 76, joinedYear: "2022", verified: true },
  { id: "sports-direct", businessName: "Sports Direct", ownerName: "Peter Mutiso", email: "sales@sportsdirect.example.com", phone: "+254 711 000 009", location: "Nairobi", saccoId: "citee-express", rating: 4.7, productsCount: 61, joinedYear: "2021", verified: true },
  { id: "fitlife", businessName: "FitLife", ownerName: "Grace Adhiambo", email: "sales@fitlife.example.com", phone: "+254 711 000 010", location: "Kikuyu", saccoId: "forward-trans", rating: 4.4, productsCount: 45, joinedYear: "2023", verified: true },
  { id: "baby-world", businessName: "Baby World", ownerName: "Esther Chebet", email: "sales@babyworld.example.com", phone: "+254 711 000 011", location: "Nairobi", saccoId: "cbd-shuttle", rating: 4.8, productsCount: 39, joinedYear: "2022", verified: true },
  { id: "beauty-zone", businessName: "Beauty Zone", ownerName: "Mercy Nyambura", email: "sales@beautyzone.example.com", phone: "+254 711 000 012", location: "Nairobi", saccoId: "citee-express", rating: 4.5, productsCount: 118, joinedYear: "2021", verified: true },
];

export function getSellerById(id?: string): Seller | undefined {
  return sellers.find((s) => s.id === id);
}
