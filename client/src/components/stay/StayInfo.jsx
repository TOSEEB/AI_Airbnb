const StayInfo = ({stay}) => {

return (

<div>


<h2 className="text-3xl font-semibold">
Entire {stay.category}
</h2>


<div className="flex gap-6 mt-3 text-gray-600">

<span>
🛏 {stay.bedrooms} Bedrooms
</span>


<span>
👥 {stay.guests} Guests
</span>

</div>


<hr className="my-8"/>



<h3 className="text-2xl font-semibold mb-4">
About this place
</h3>


<p className="text-gray-700 leading-8">
{stay.description}
</p>


</div>

)

}


export default StayInfo;