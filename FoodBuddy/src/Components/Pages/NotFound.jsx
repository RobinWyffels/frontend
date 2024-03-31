import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function NotFound(){
  const {pathname} = useLocation();

  return (
    <div className="not-found" data-cy="not_found">
    <h1>Not found</h1>
    <div>
      There is nothing at {pathname}, <Link to='/'>Back to main</Link>
    </div>
    </div>
  )
}