import "./heading-title.css"; 

const HeadingTitle = ({title}) => {
    return (      
    <div className="wrapperStyles">
        <h2 className="titleStyles">  {   title  }  </h2>
    </div> 
    );
}

export default HeadingTitle;