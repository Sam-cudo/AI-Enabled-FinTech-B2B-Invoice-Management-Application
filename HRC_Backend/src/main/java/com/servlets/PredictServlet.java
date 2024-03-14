package com.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.connection.DbConnection;

@WebServlet(urlPatterns = {"/PredictServlet"}, name = "PredictServlet")
public class PredictServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public PredictServlet() {
        super();
    }

    DbConnection connect = new DbConnection();
    
    public Integer InsertData(String aging_bucket, String predicted_doc_id)
	{
		try {
		 Connection conn = connect.getConnection();
		 String sql_query="UPDATE winter_internship SET aging_bucket = ? WHERE doc_id= ? ";
		 PreparedStatement pst = conn.prepareStatement(sql_query);
	
				pst.setString(1, aging_bucket);
				pst.setString(2, predicted_doc_id);
				
				pst.executeUpdate();
				System.out.println("Predict Data Inserted...");				
				
		 }
		 catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception occured at predicted Insert query");
		 }
		return 1;
	}
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
                

		String aging_bucket = request.getParameter("aging_bucket");
		String doc_id = request.getParameter("predicted_doc_id");
      
          
        int status=InsertData(aging_bucket,doc_id);  
        
        if(status>0){ 
        	System.out.println("Data Predicted");         
        }else{  
            System.out.println("Sorry! unable to save predicted record");  
        }   
    }  
}

