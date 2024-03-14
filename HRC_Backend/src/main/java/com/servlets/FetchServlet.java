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
import com.pojo.InvoicePojo;

@WebServlet(urlPatterns = {"/FetchServlet"}, name = "FetchServlet")
public class FetchServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;	
  
    public FetchServlet() {
        super();
    }
 
    DbConnection connect = new DbConnection();
	
	public ArrayList<InvoicePojo> getData(int start, int end, String order, String orderBy, String BY, String CN, String ID, String DD)
	{
		ArrayList<InvoicePojo> ALLInvoices = new ArrayList<InvoicePojo>();
		
		try {
			Connection conn = connect.getConnection();
			String sql_query = 	"SELECT winter_internship.*,customer.name_customer "
								+ "FROM winter_internship "
								+ "INNER JOIN customer "
								+ "ON winter_internship.cust_number=customer.cust_number "
								+ "WHERE is_deleted=0 AND winter_internship.cust_number LIKE ? AND buisness_year LIKE ? AND doc_id LIKE ? AND invoice_id LIKE ? "
								+ "ORDER BY " + orderBy + " " + order +" LIMIT ?,?";
			
			PreparedStatement pst = conn.prepareStatement(sql_query);
	
			String cust_number = CN + "%";
			String buisness_year = BY + "%";
			String doc_id = DD + "%";
			String invoice_id = ID + "%";
			
			pst.setString(1, cust_number);
			pst.setString(2, buisness_year);
			pst.setString(3, doc_id);
			pst.setString(4, invoice_id);
			pst.setInt(5, start);
			pst.setInt(6, end);
			
			System.out.println(pst);
			ResultSet rs = pst.executeQuery();
		
			while(rs.next())
			{
				InvoicePojo i = new InvoicePojo();
				
				i.setSl_no(rs.getInt("sl_no"));
				i.setBusiness_code(rs.getString("business_code"));
				i.setCust_number(rs.getInt("cust_number"));
				i.setClear_date(rs.getString("clear_date"));
				i.setBuisness_year(rs.getString("buisness_year"));
				i.setDoc_id(rs.getString("doc_id"));
				i.setPosting_date(rs.getString("posting_date"));
				i.setDocument_create_date(rs.getString("document_create_date"));
				i.setDue_in_date(rs.getString("due_in_date"));
				i.setInvoice_currency(rs.getString("invoice_currency"));
				i.setDocument_type(rs.getString("document_type"));
				i.setPosting_id(rs.getInt("posting_id"));
				i.setTotal_open_amount(rs.getDouble("total_open_amount"));
				i.setBaseline_create_date(rs.getString("baseline_create_date"));
				i.setCust_payment_terms(rs.getString("cust_payment_terms"));
				i.setInvoice_id(rs.getInt("invoice_id"));
				i.setName_customer(rs.getString("name_customer"));
				i.setAging_bucket(rs.getString("aging_bucket"));
				
				if(i.getInvoice_currency() == "CAD")		
					i.setConverted_usd((i.getTotal_open_amount()*0.7));
				else
					i.setConverted_usd(i.getTotal_open_amount());
				
				ALLInvoices.add(i);		
			}
			for(InvoicePojo invo:ALLInvoices)
			{
				System.out.println(invo.toString());
			}

		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("Exception occured at Select Query");
		}
		return ALLInvoices;
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int start = Integer.parseInt( request.getParameter("start"));
		int end= Integer.parseInt( request.getParameter("end"));
		String order = (request.getParameter("order"));
		String orderBy = (request.getParameter("orderBy"));
        String BY = request.getParameter("buisness_year");
        String CN;
        if(request.getParameter("cust_numberById")=="")
        	{ CN = request.getParameter("cust_number");}
        else
        	{ CN = request.getParameter("cust_numberById");}
        String ID = request.getParameter("invoice_id"); 
        String DD = request.getParameter("doc_id");
		
		ArrayList<InvoicePojo> data = getData(start, end, order, orderBy, BY, CN, ID, DD);
		
		Gson gson = new Gson();
		String respData = gson.toJson(data);
		response.getWriter().print(respData);
	}
}

