import React, {useEffect, useState, useRef} from 'react';
import firebase from './firebase';

const Admin = () => {
    const [data, setData] = useState([]);
    /*
    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('math-question-new-db').orderBy("question_id").get().then((snapshot) => {
            const d = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(d);
        });
        return () => unsubscribe();
    }, []); 
    */
    const isMountedRef = useRef(null);
    
    useEffect(() => {
      isMountedRef.current = true;
      firebase.firestore().collection('math-question-new-db').orderBy("question_id").get().then((snapshot) => {
        if(isMountedRef.current) {
            const d = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(d);
        }      
      });
      return () => isMountedRef.current = false;
    }); 
    return (
        <div className="Admin">
            <h1>Admin</h1>
            <div className="tableResults">
                <table>
                    <tbody>
                        <tr>
                            <th>questionid</th>
                            <th>chapter</th>
                            <th>question</th>
                            <th>user answer</th>
                            <th>correct answer</th>
                            <th>result</th>
                            <th>user id</th>
                        </tr>
                        {data.map((d) => 
                            <tr key={d.id}>
                                <td>{d.question_id}</td>
                                <td>{d.chapter}</td>
                                <td>{d.questionString}</td>
                                <td>{d.user_answer}</td>
                                <td>{d.correct_answer}</td>
                                <td>{d.result}</td>
                                <td>{d.user_id}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        </div>      
    );
}

export default Admin;
