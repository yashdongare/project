const form = document.querySelector('#searchform');
const res = document.querySelector('#tableresult');
var upd;

form.addEventListener('submit',(e)=>{

    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }

    const ctype = form.elements.coinType.value;

    fetchPrice(ctype);


});
  
const fetchPrice= async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`);
    console.log(r.data.coin.price);
    const price = r.data.coin.price;
    const volume = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const base = r.data.coin.name;
    const target = 'INR';

    res.innerHTML =`<tr style="background-color:yellow; color:black;">
    <td>
        <b>Property</b>
    </td>
    <td> <b>Value</b> </td>
</tr>
<tr>
    <td>
        ${base}
    </td>
    <td> ${price} ${target}</td>
</tr>
<tr>
    <td>
        Volume
    </td>
    <td> ${volume} </td>
</tr>
    <tr>
        <td>
            Change
        </td>
        <td> ${change} </td>
    </tr>

</tr>`;

upd= setTimeout(()=>fetchPrice(ctype),10000);


}  