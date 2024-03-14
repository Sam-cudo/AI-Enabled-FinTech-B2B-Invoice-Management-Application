package com.pojo;

public class ChartPojo {
	
	private String total_open_amount;
	private String no_of_customers;
	
	public String getTotal_open_amount() {
		return total_open_amount;
	}
	public void setTotal_open_amount(String total_open_amount) {
		this.total_open_amount = total_open_amount;
	}
	public String getNo_of_customers() {
		return no_of_customers;
	}
	public void setNo_of_customers(String no_of_customers) {
		this.no_of_customers = no_of_customers;
	}
	@Override
	public String toString() {
		return "ChartPojo [total_open_amount=" + total_open_amount + ", no_of_customers=" + no_of_customers + "]";
	}
}
