import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const generateInvoicePdf = (order, orderItems) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    // Helper: format currency without Unicode rupee symbol
    const currency = (val) => 'Rs. ' + (parseFloat(val) || 0).toFixed(2);

    // ──────────────────────────────────────
    // HEADER ACCENT BAR
    // ──────────────────────────────────────
    doc.setFillColor(43, 43, 209);
    doc.rect(0, 0, pageWidth, 8, 'F');

    // ──────────────────────────────────────
    // COMPANY INFO (Left)
    // ──────────────────────────────────────
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(43, 43, 209);
    doc.text('TIMECRAFT', margin, 25);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text('Premium Watch Customization', margin, 31);
    doc.text('timecraft@example.com  |  +1 (800) 123-4567', margin, 36);
    doc.text('123 Luxury Ave, New York, NY 10001', margin, 41);

    // ──────────────────────────────────────
    // INVOICE TITLE (Right)
    // ──────────────────────────────────────
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(43, 43, 209);
    doc.text('INVOICE', pageWidth - margin, 25, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text('Order #' + (order.oid || '---'), pageWidth - margin, 33, { align: 'right' });
    
    const status = (order.payment_status || 'pending').toUpperCase();
    doc.text('Status: ' + status, pageWidth - margin, 39, { align: 'right' });

    // ──────────────────────────────────────
    // DIVIDER LINE
    // ──────────────────────────────────────
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(margin, 48, pageWidth - margin, 48);

    // ──────────────────────────────────────
    // BILLED TO (Left) + INVOICE DETAILS (Right)
    // ──────────────────────────────────────
    let yPos = 58;

    // BILLED TO label
    doc.setFillColor(43, 43, 209);
    doc.roundedRect(margin, yPos - 4, 22, 6, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text('BILLED TO', margin + 2, yPos);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text(order.full_name || 'Customer', margin, yPos + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(order.email || '', margin, yPos + 14);
    doc.text(order.mobile || '', margin, yPos + 19);
    
    if (order.address) {
        doc.text(order.address, margin, yPos + 25);
        const cityLine = [order.city, order.state, order.country].filter(Boolean).join(', ');
        doc.text(cityLine, margin, yPos + 30);
    }

    // INVOICE DETAILS label (right side)
    doc.setFillColor(50, 50, 50);
    doc.roundedRect(pageWidth - margin - 30, yPos - 4, 30, 6, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text('INVOICE DETAILS', pageWidth - margin - 28, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text('Order ID: #' + (order.oid || '---'), pageWidth - margin, yPos + 8, { align: 'right' });
    doc.text('Platform: TimeCraft Store', pageWidth - margin, yPos + 14, { align: 'right' });

    // ──────────────────────────────────────
    // ITEMS TABLE
    // ──────────────────────────────────────
    const tableStartY = yPos + 42;

    const tableBody = (orderItems || []).map((item, idx) => [
        (idx + 1).toString(),
        item.product?.title || 'Product',
        currency(item.price),
        (item.qty || 1).toString(),
        item.saved && parseFloat(item.saved) > 0 ? '-' + currency(item.saved) : '---',
        currency(item.sub_total)
    ]);

    autoTable(doc, {
        startY: tableStartY,
        margin: { left: margin, right: margin },
        head: [['#', 'Product Details', 'Unit Price', 'Qty', 'Discount', 'Subtotal']],
        body: tableBody,
        theme: 'grid',
        headStyles: {
            fillColor: [43, 43, 209],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 9,
            cellPadding: { top: 5, bottom: 5, left: 5, right: 5 },
            halign: 'center',
        },
        bodyStyles: {
            fontSize: 10,
            textColor: [40, 40, 40],
            cellPadding: { top: 5, bottom: 5, left: 5, right: 5 },
            lineColor: [230, 230, 230],
            lineWidth: 0.3,
        },
        columnStyles: {
            0: { cellWidth: 12, halign: 'center', fontStyle: 'bold' },
            1: { cellWidth: 'auto', halign: 'left' },
            2: { cellWidth: 30, halign: 'right', fontStyle: 'bold' },
            3: { cellWidth: 18, halign: 'center' },
            4: { cellWidth: 28, halign: 'center', textColor: [220, 53, 69] },
            5: { cellWidth: 32, halign: 'right', fontStyle: 'bold' },
        },
        alternateRowStyles: {
            fillColor: [248, 249, 252],
        },
    });

    // ──────────────────────────────────────
    // SUMMARY SECTION
    // ──────────────────────────────────────
    let summaryY = doc.lastAutoTable.finalY + 15;
    const summaryBoxWidth = 82;
    const summaryX = pageWidth - margin - summaryBoxWidth;

    // Summary background box
    doc.setFillColor(248, 249, 252);
    doc.setDrawColor(220, 220, 230);
    doc.setLineWidth(0.3);
    doc.roundedRect(summaryX, summaryY - 5, summaryBoxWidth, 78, 3, 3, 'FD');

    // Summary title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text('Payment Summary', summaryX + 6, summaryY + 4);

    doc.setDrawColor(200, 200, 210);
    doc.line(summaryX + 5, summaryY + 7, summaryX + summaryBoxWidth - 5, summaryY + 7);

    const summaryItems = [
        ['Sub Total', currency(order.sub_total)],
        ['Shipping', currency(order.shipping_amount)],
        ['Tax', currency(order.tax_fee)],
        ['Service Fee', currency(order.service_fee)],
    ];

    let lineY = summaryY + 16;

    summaryItems.forEach(([label, value]) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(label, summaryX + 6, lineY);
        
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(50, 50, 50);
        doc.text(value, summaryX + summaryBoxWidth - 6, lineY, { align: 'right' });
        lineY += 8;
    });

    if (order.saved && parseFloat(order.saved) > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(220, 53, 69);
        doc.text('Discount', summaryX + 6, lineY);
        doc.text('-' + currency(order.saved), summaryX + summaryBoxWidth - 6, lineY, { align: 'right' });
        lineY += 8;
    }

    // ──────────────────────────────────────
    // TOTAL AMOUNT BAR
    // ──────────────────────────────────────
    const totalBarY = lineY + 2;
    doc.setFillColor(43, 43, 209);
    doc.roundedRect(summaryX, totalBarY, summaryBoxWidth, 14, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('TOTAL PAID', summaryX + 6, totalBarY + 9);

    doc.setFontSize(14);
    doc.text(currency(order.total), summaryX + summaryBoxWidth - 6, totalBarY + 9.5, { align: 'right' });

    // ──────────────────────────────────────
    // NOTE SECTION (Left side, same row as summary)
    // ──────────────────────────────────────
    const noteY = doc.lastAutoTable.finalY + 15;
    const noteWidth = summaryX - margin - 10;

    doc.setFillColor(248, 249, 252);
    doc.setDrawColor(220, 220, 230);
    doc.roundedRect(margin, noteY - 5, noteWidth, 40, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    doc.text('Note:', margin + 6, noteY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    const noteLines = doc.splitTextToSize(
        'This is a system-generated invoice. For any queries regarding this order, please contact our support team at timecraft@example.com or call +1 (800) 123-4567.',
        noteWidth - 12
    );
    doc.text(noteLines, margin + 6, noteY + 12);

    // ──────────────────────────────────────
    // FOOTER
    // ──────────────────────────────────────
    const footerY = Math.max(totalBarY + 30, noteY + 55);

    doc.setDrawColor(220, 220, 220);
    doc.line(margin, footerY, pageWidth - margin, footerY);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Thank you for choosing TimeCraft!', pageWidth / 2, footerY + 8, { align: 'center' });

    // ──────────────────────────────────────
    // BOTTOM ACCENT BAR
    // ──────────────────────────────────────
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFillColor(43, 43, 209);
    doc.rect(0, pageHeight - 6, pageWidth, 6, 'F');

    // ──────────────────────────────────────
    // SAVE PDF
    // ──────────────────────────────────────
    const filename = 'TimeCraft_Invoice_' + (order.oid || 'order') + '.pdf';
    doc.save(filename);
};

export default generateInvoicePdf;
