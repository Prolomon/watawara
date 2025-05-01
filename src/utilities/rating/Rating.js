"use client"
import {RatingStar} from "rating-star"
import {Star} from "lucide-react"
function RateStarIcon () {
    return <Star color="#fdc700" />;
}

export default function Rating ({rating, size}) {

    return (
      <div className="w-auto relative -top-4 -left-3">
        <RatingStar
          starIcon={RateStarIcon}
          maxScore={5}
          id="88"
          rating={rating}
          size={size}
          numberOfStar={5}
          colours={{ mask: "#fdc700" }}
        />
      </div>
    );
}