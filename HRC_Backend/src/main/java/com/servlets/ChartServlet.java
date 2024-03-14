package com.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connection.DbConnection;
import com.google.gson.Gson;
import com.pojo.ChartPojo;

@WebServlet(urlPatterns = {"/ChartServlet"}, name = "ChartServlet")
public class ChartServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;	
  
    public ChartServlet () {
        super();
    }
     
    DbConnection connect = new DbConnection();
	
	public ArrayList<ChartPojo> ChartData(String CDV1, String CDV2, String DDV1, String DDV2, String BCDV1, String BCDV2, String I_C)
	{
		ArrayList<ChartPojo> ALLCharts = new ArrayList<ChartPojo>();
		
		try {
			Connection conn = connect.getConnection();
			String sql_query = "SELECT total_open_amount, COUNT(cust_number) AS no_of_customers FROM winter_internship WHERE is_deleted=0";
			
			if(CDV1!=null && CDV2!=null)
			{
				sql_query = sql_query + " AND clear_date BETWEEN " + CDV1 +" AND " + CDV2;
			}
			if(DDV1!=null && DDV2!=null)
			{
				sql_query = sql_query + " AND clear_date BETWEEN " + DDV1 +" AND " + DDV2;
			}
			if(BCDV1!=null && BCDV2!=null)
			{
				sql_query = sql_query + " AND clear_date BETWEEN " + BCDV1 +" AND " + BCDV2;
			}
			if(I_C!="")
			{
				sql_query = sql_query + " AND invoice_currency = '" + I_C +"'";
			}
			
			sql_query = sql_query + " GROUP BY business_code"; 
			
			PreparedStatement pst = conn.prepareStatement(sql_query);
			System.out.println(pst);
			ResultSet rs = pst.executeQuery();
			
			while(rs.next())
			{
				ChartPojo i = new ChartPojo();
				
				i.setTotal_open_amount(rs.getString("total_open_amount"));
				i.setNo_of_customers(rs.getString("no_of_customers"));
							
				ALLCharts.add(i);		
			}
			for(ChartPojo stud: ALLCharts)
			{
				System.out.println(stud.toString());
			}
		}
		catch (Exception err) {
			err.printStackTrace();
			System.out.println("Exception occured at Chart Query");
		}
		return ALLCharts;
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
        String CDV1 = request.getParameter("CDvalue1");
        String CDV2 = request.getParameter("CDvalue2");  
        String DDV1 = request.getParameter("DDvalue1"); 
        String DDV2 = request.getParameter("DDvalue2");
        String BCDV1 = request.getParameter("BCDvalue1");
        String BCDV2 = request.getParameter("BCDvalue2");
        String I_C = request.getParameter("invoice_currency");
		
        
        
		ArrayList<ChartPojo> data = ChartData(CDV1,CDV2,DDV1,DDV2,BCDV1,BCDV2,I_C);
		
		Gson gson = new Gson();
		String respData = gson.toJson(data);
		response.getWriter().print(respData);
	}
}


