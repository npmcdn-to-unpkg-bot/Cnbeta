export default ({ stories }) => {
    const items = stories.map((story) => {
       return (
           <li>{story.title}</li>
       ) 
    });
    return (
        <ul>
            {items}
        </ul>
    )
}