export default ({ entries }) => {
    const items = entries.map((entry) => {
       return (
           <li>{entry.title}</li>
       ) 
    });
    return (
        <ul>
            {items}
        </ul>
    )
}