import { useEffect, useRef, useState } from "react";
import "./meme.css";
import axios from "axios";
const Meme = () => {
    const [listMemes, setListMemes] = useState([]);
    const [searchText, setSearchText] = useState();
    const [isClickItem, setClickItem] = useState(false);
    const [urlItem, setUrlItem] = useState();
    useEffect(() => {
        async function getData() {
            const res = await axios.get("https://api.imgflip.com/get_memes");
            return res;
        }
        getData().then(res => {
            if (searchText) {
                const newList = res.data.data.memes.filter(item => item.name.toUpperCase().includes(searchText.toUpperCase()));
                setListMemes(newList);
            }
            else setListMemes(res.data.data.memes)
        });
    }, [searchText])
    const content = useRef();
    const handleClick = () => {
        setSearchText(content.current.value);
    }
    const handleClickItem = (e) => {
        setUrlItem(e.target.src);
        setClickItem(true);
    }
    const handleClickBack = () => {
        setSearchText();
        setClickItem(false);
    }
    return (
        <>
            {!isClickItem && <div className="search-container">
                <input ref={content} type="text" className="search-text" placeholder="Search" />
                <button className="search-btn" onClick={handleClick}>Search</button>
            </div>}

            <div className="list-items">
                {isClickItem ? (

                    listMemes.filter(item => item.url.includes(urlItem)).map(item => {
                        return (
                            <div key={item.id} className="item-detail">
                                <img src={item.url} alt="" className="item-img" />
                                <p className="item-title">Name: {item.name}</p>
                                <i className="fa-solid fa-right-to-bracket" onClick={handleClickBack}></i>
                            </div>
                        )
                    })

                ) : (

                    listMemes.map(item => {
                        return (
                            <div key={item.id} className="item" onClick={handleClickItem}>
                                <img src={item.url} alt="" className="item-img" />
                            </div>
                        )
                    })

                )}

            </div>
        </>
    );
}

export default Meme;