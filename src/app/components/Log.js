import { useSelector } from 'react-redux';
import { LogDisplay } from './LogDisplay';
import {
    selectAllBabbles,
} from '../../features/babble/babbleSlice';
import { useParams } from 'react-router-dom';
import "../../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Log = () => {
    const { folder } = useParams();
    const babbleList = useSelector(selectAllBabbles);
    const folderBabbles = babbleList.filter(babble => babble.folder === folder);
    let yesterday = new Date();
    let lastWeek = new Date();
    let lastMonth = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    lastWeek.setDate(lastWeek.getDate() - 7);
    lastMonth.setDate(lastMonth.getDate() - 30);
    const todayBabbles = folderBabbles.filter((babble) => {
        let tempDate = new Date(babble.updatedAt)
        return(tempDate >= yesterday);
    });
    const lastWeekBabbles = folderBabbles.filter((babble) => {
        let tempDate = new Date(babble.updatedAt)
        return((tempDate < yesterday) && (tempDate >= lastWeek));
    });
    const lastMonthBabbles = folderBabbles.filter((babble) => {
        let tempDate = new Date(babble.updatedAt)
        return((tempDate < lastWeek) && (tempDate >= lastMonth));
    });
    const olderBabbles = folderBabbles.filter((babble) => {
        let tempDate = new Date(babble.updatedAt)
        return(tempDate < lastMonth);
    });
    
    return(
        <div className="d-flex flex-column align-items-center" style={{width: "300px"}}>
            <div className="d-flex flex-row justify-content-start" style={{width: "100%"}}>
                <span className="handwriting-text" style={{color: "white"}}>Today</span>
            </div>
            <div>
                {todayBabbles.map( babble =>
                <LogDisplay babble={babble} babbleID={babble.id} />
                )}
            </div>
            <div className="d-flex flex-row justify-content-start" style={{width: "100%"}}>
                <span className="handwriting-text" style={{color: "white"}}>Last Week</span>
            </div>
            <div>
                {lastWeekBabbles.map( babble =>
                <LogDisplay babble={babble} babbleID={babble.id} />
                )}
            </div>
            <div className="d-flex flex-row justify-content-start" style={{width: "100%"}}>
                <span className="handwriting-text" style={{color: "white"}}>Last 30 Days</span>
            </div>
            <div>
                {lastMonthBabbles.map( babble =>
                <LogDisplay babble={babble} babbleID={babble.id} />
                )}
            </div>
            <div className="d-flex flex-row justify-content-start" style={{width: "100%"}}>
                <span className="handwriting-text" style={{color: "white"}}>Older</span>
            </div>
            <div>
                {olderBabbles.map( babble =>
                <LogDisplay babble={babble} babbleID={babble.id} />
                )}
            </div>
        </div>
    )

}