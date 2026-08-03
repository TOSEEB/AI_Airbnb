import ReviewCard from "../ReviewCard";


const ReviewsSection = ({reviews})=>{


return (

<div>


<h2 className="text-3xl font-bold mb-6">
Reviews
</h2>



{
reviews.length > 0 ?

reviews.map((review)=>(

<ReviewCard
key={review._id}
review={review}
/>

))


:

<p className="text-gray-500">
No reviews yet.
</p>


}


</div>


)


}


export default ReviewsSection; 