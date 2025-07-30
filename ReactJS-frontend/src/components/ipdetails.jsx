
const IpDetails = ({ ip }) => {

  
  return (
    <>
      <div>
        <p>IP address: {ip.ip}</p>
        <p>City & Postal: {ip.city}, {ip.postal}</p>
        <p>Region: {ip.region}</p>
        <p>Country: {ip.country}</p>
        <p>Timezone: {ip.timezone}</p>
      </div>
    </>
  )

}

export default IpDetails