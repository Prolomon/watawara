import { Star } from "lucide-react"

export default function ReviewChart ({reviews}) {
    let rate1 = reviews.filter(review => review.rating < 2).length === 0 ? 0 : reviews.filter(review => review.rating >= 1 && review.rating < 2).map(_p => _p.rating).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / reviews.filter(review => review.rating >= 1 && review.rating < 2).map(_p => _p.rating).length

    //rating 2 chart data
    const rate2 = reviews.filter(review => review.rating >= 2 && review.rating < 3).length === 0 ? 0 : reviews.filter(review => review.rating >= 2 && review.rating < 3).map(_p => _p.rating).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / reviews.filter(review => review.rating >= 2 && review.rating < 3).map(_p => _p.rating).length

    //rating 3 chart data
    const rate3 = reviews.filter(review => review.rating >= 3 && review.rating < 4).length === 0 ? 0 : reviews.filter(review => review.rating >= 3 && review.rating < 4).map(_p => _p.rating).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / reviews.filter(review => review.rating >= 3 && review.rating < 4).map(_p => _p.rating).length

    //rating 4 chart data
    const rate4 = reviews.filter(review => review.rating >= 4 && review.rating < 5).length === 0 ? 0 : reviews.filter(review => review.rating >= 4 && review.rating < 5).map(_p => _p.rating).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / reviews.filter(review => review.rating >= 4 && review.rating < 5).map(_p => _p.rating).length
    
    // rating 5 chart data
    const rate5 = reviews.filter(review => review.rating == 5).length === 0 ? 0 : reviews.filter(review => review.rating == 5).map(_p => _p.rating).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / reviews.filter(review => review.rating == 5).map(_p => _p.rating).length
    return (
      <div className="text-gray-800 my-4 grid gap-2">
        <div className="flex gap-2 items-center">
          <span>5</span>
          <Star fill="#fdc700" stroke="0" />
          <progress
            type="range"
            min={0}
            max={5}
            readOnly
            className={`progress w-11/12  progress-active`}
            value={rate5}
          />
          <span>{rate5}%</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>4</span>
          <Star fill="#fdc700" stroke="0" />
          <progress
            type="range"
            min={0}
            max={5}
            readOnly
            className={`progress w-11/12  progress-active`}
            value={rate4}
          />
          <span>{rate4}%</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>3</span>
          <Star fill="#fdc700" stroke="0" />
          <progress
            type="range"
            min={0}
            max={5}
            readOnly
            className={`progress w-11/12  progress-active`}
            value={rate3}
          />
          <span>{rate3}%</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>2</span>
          <Star fill="#fdc700" stroke="0" />
          <progress
            type="range"
            min={0}
            max={5}
            readOnly
            className={`progress w-11/12  progress-active`}
            value={rate2}
          />
          <span>{rate2}%</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>1</span>
          <Star fill="#fdc700" stroke="0" />
          <progress
            type="range"
            min={0}
            max={5}
            readOnly
            className={`progress w-11/12  progress-active`}
            value={rate1}
          />
          <span>{rate1}%</span>
        </div>
      </div>
    );
}