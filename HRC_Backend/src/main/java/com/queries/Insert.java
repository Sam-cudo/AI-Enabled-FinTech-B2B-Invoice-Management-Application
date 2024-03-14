package com.queries;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.connection.DbConnection;
import com.pojo.InvoicePojo;

public class Insert {
	
	DbConnection connect = new DbConnection();
	
	public Integer InsertData(InvoicePojo i)
	{
		String clear_date0, posting_date0, document_create_date0, due_in_date0, baseline_create_date0;
		try {
		 Connection conn = connect.getConnection();
		 String sql_query="INSERT INTO winter_internship(business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id ) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		 PreparedStatement pst = conn.prepareStatement(sql_query);
		 
			 	clear_date0 = i.getClear_date();
			 	clear_date0 = clear_date0.substring(0,10);
			    Date UDOB0 = new SimpleDateFormat("yyyy-MM-dd").parse(clear_date0);
			    java.sql.Date clear_date = new java.sql.Date( UDOB0.getTime() );
			 	posting_date0 = i.getClear_date();
			 	posting_date0 = posting_date0.substring(0,10);
			    Date UDOB2 = new SimpleDateFormat("yyyy-MM-dd").parse(posting_date0);
			    java.sql.Date posting_date = new java.sql.Date( UDOB2.getTime() );
			 	document_create_date0 = i.getDocument_create_date();
			 	document_create_date0 = document_create_date0.substring(0,10);
			    Date UDOB3 = new SimpleDateFormat("yyyy-MM-dd").parse(document_create_date0);
			    java.sql.Date document_create_date = new java.sql.Date( UDOB3.getTime() );
			 	due_in_date0 = i.getDue_in_date();
			 	due_in_date0 = due_in_date0.substring(0,10);
			    Date UDOB4 = new SimpleDateFormat("yyyy-MM-dd").parse(due_in_date0);
			    java.sql.Date due_in_date = new java.sql.Date( UDOB4.getTime() );
			 	baseline_create_date0 = i.getBaseline_create_date();
			 	baseline_create_date0 = baseline_create_date0.substring(0,10);
			    Date UDOB5 = new SimpleDateFormat("yyyy-MM-dd").parse(baseline_create_date0);
			    java.sql.Date baseline_create_date = new java.sql.Date( UDOB5.getTime() );
				
				
				pst.setString(1, i.getBusiness_code());
				pst.setInt(2, i.getCust_number());
				pst.setDate(3, clear_date);
				pst.setString(4, i.getBuisness_year());
				pst.setString(5, i.getDoc_id());
				pst.setDate(6, posting_date);
				pst.setDate(7, document_create_date);
				pst.setDate(8, due_in_date);
				pst.setString(9, i.getInvoice_currency());
				pst.setString(10, i.getDocument_type());
				pst.setInt(11, i.getPosting_id());
				pst.setDouble(12, i.getTotal_open_amount());
				pst.setDate(13, baseline_create_date);
				pst.setString(14, i.getCust_payment_terms());
				pst.setInt(15, i.getInvoice_id());
				
				pst.executeUpdate();
				System.out.println("Data Inserted...");				
				
		 }
		 catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception occured at Insert query");
		 }
		return 1;
	}

}


