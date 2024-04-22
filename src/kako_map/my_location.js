
import {Map, MapMarker} from "react-kakao-maps-sdk";
import {useEffect, useState} from "react";



function My_location() {
    const [state, setState] = useState({
        center: {
            lat: 33.450701,
            lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
    })


    useEffect(() => {
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("현재 위치의 위도:", position.coords.latitude);
                    console.log("현재 위치의 경도:", position.coords.longitude);
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude, // 위도
                            lng: position.coords.longitude, // 경도
                        },
                        isLoading: false,
                    }))
                },
                (err) => {
                    setState((prev) => ({
                        ...prev,
                        errMsg: err.message,
                        isLoading: false,
                    }))
                }
            )
        } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            setState((prev) => ({
                ...prev,
                errMsg: "geolocation을 사용할수 없어요..",
                isLoading: false,
            }))
        }
    }, [])

    return (
        <>
            <Map // 지도를 표시할 Container
                center={state.center}
                style={{
                    // 지도의 크기
                    width: "100%",
                    height: "100%",
                }}
                level={3} // 지도의 확대 레벨
            >
                {!state.isLoading && (
                    <MapMarker position={state.center}>
                        <div style={{ padding: "5px", color: "#000" }}>
                            {state.errMsg ? state.errMsg : "내위치는 콘솔!"}
                        </div>
                    </MapMarker>
                )}
            </Map>
        </>
    )
}

export default My_location;