/**
 * Named `SaccoRoute` (not `Route`) to avoid colliding with react-router-dom's <Route>.
 */
export interface SaccoRoute {
  id: string;
  saccoId: string;
  from: string;
  to: string;
  estimatedTime: string;
  price: number;
}
