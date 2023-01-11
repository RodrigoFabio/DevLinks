import './social.css'

export function Social(props){
    return(
            <a className="social" href={props.url} rel="noopener noreferrer" target="_blank">
                {props.children}
            </a>
    );
}