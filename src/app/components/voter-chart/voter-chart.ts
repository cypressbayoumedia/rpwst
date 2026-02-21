import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-voter-chart',
    imports: [CommonModule],
    templateUrl: './voter-chart.html',
    styleUrl: './voter-chart.css'
})
export class VoterChart implements OnInit, AfterViewInit {
    @ViewChild('chartSection') chartSection!: ElementRef;

    hasAnimated = false;

    voterData = [
        { label: 'Republican', count: 91984, color: '#D50000', percentage: 47.45, dashArray: '', offset: 0 },
        { label: 'Democrat', count: 40167, color: '#5880DF', percentage: 20.72, dashArray: '', offset: 0 },
        { label: 'Other/Unaffiliated', count: 61711, color: '#05B240', percentage: 31.83, dashArray: '', offset: 0 }
    ];

    totalVoters = 193862;
    circumference = 2 * Math.PI * 40; // 251.327

    ngOnInit() {
        this.calculateDashArrays();
    }

    ngAfterViewInit() {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !this.hasAnimated) {
                // Little timeout to ensure CSS transitions happen cleanly
                setTimeout(() => {
                    this.hasAnimated = true;
                }, 100);
                observer.disconnect();
            }
        }, { threshold: 0.3 });

        if (this.chartSection) {
            observer.observe(this.chartSection.nativeElement);
        }
    }

    calculateDashArrays() {
        let currentOffset = 0;
        this.voterData.forEach(segment => {
            // Calculate length of the stroke dash
            const segmentLength = (segment.percentage / 100) * this.circumference;
            // Set the stroke-dasharray (length of dash, length of clear space)
            segment.dashArray = `${segmentLength} ${this.circumference - segmentLength}`;
            // Offset backwards based on preceding segments
            segment.offset = -currentOffset;
            currentOffset += segmentLength;
        });
    }
}
